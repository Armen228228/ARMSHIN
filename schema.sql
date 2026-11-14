-- ARMSHIN / BARON initial PostgreSQL schema.
-- Apply only to a fresh development database after reviewing this file.
create extension if not exists pgcrypto;

create type public.app_role as enum ('director', 'specialist');
create type public.request_status as enum ('new', 'reviewing', 'waiting_quotes', 'proposal_sent', 'approved', 'completed', 'cancelled');
create type public.commission_type as enum ('fixed', 'percentage');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete restrict,
  full_name text not null,
  role public.app_role not null default 'director',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.customer_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text,
  service_type text not null,
  description text,
  address text,
  status public.request_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  contact_name text,
  phone text,
  email text,
  service_categories text[] not null default '{}',
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.partner_quotes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.customer_requests(id) on delete restrict,
  partner_id uuid not null references public.partners(id) on delete restrict,
  amount numeric(14,2) check (amount >= 0),
  currency char(3) not null default 'AMD',
  details text,
  received_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique references public.customer_requests(id) on delete restrict,
  partner_id uuid references public.partners(id) on delete restrict,
  customer_total numeric(14,2) not null default 0 check (customer_total >= 0),
  partner_cost numeric(14,2) not null default 0 check (partner_cost >= 0),
  commission_kind public.commission_type not null,
  commission_value numeric(14,2) not null check (commission_value >= 0),
  commission_amount numeric(14,2) not null default 0 check (commission_amount >= 0),
  currency char(3) not null default 'AMD',
  deal_date date not null default current_date,
  notes text
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount numeric(14,2) not null check (amount > 0),
  currency char(3) not null default 'AMD',
  expense_date date not null default current_date,
  category text,
  notes text,
  created_by uuid references public.profiles(id) on delete restrict
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete restrict,
  action text not null,
  entity_type text not null,
  entity_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Deny direct browser access by default. Server-side access policies are a later,
-- separately tested implementation step. Never enable broad public write access.
alter table public.profiles enable row level security;
alter table public.customer_requests enable row level security;
alter table public.partners enable row level security;
alter table public.partner_quotes enable row level security;
alter table public.deals enable row level security;
alter table public.expenses enable row level security;
alter table public.audit_log enable row level security;

revoke all on all tables in schema public from anon, authenticated;
