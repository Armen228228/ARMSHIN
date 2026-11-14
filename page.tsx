const modules = [
  ['Հայտեր', 'Հաճախորդների դիմումներ և ընթացիկ կարգավիճակ', '01'],
  ['Հաճախորդներ', 'Կոնտակտներ և դիմումների պատմություն', '02'],
  ['Գործընկերներ', 'Մատակարար կազմակերպություններ և մասնագետներ', '03'],
  ['Գնառաջարկներ', 'Գործընկերների առաջարկների համեմատություն', '04'],
  ['Գործարքներ', 'Պայմանավորվածություններ և պատվերներ', '05'],
  ['Ֆինանսներ', 'Միջնորդավճարներ, եկամուտներ և ծախսեր', '06'],
  ['Հաշվետվություններ', 'Ամսական և տարեկան ամփոփումներ', '07'],
  ['Գործողությունների մատյան', 'Կարևոր փոփոխությունների պատմություն', '08'],
];

export default function Home() {
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">A</span><div><b>ARMSHIN</b><small>BARON CONTROL</small></div></div>
      <div className="side-label">ԿԱՌԱՎԱՐՈՒՄ</div>
      <nav>{modules.map(([name], i) => <div className={`nav-item ${i === 0 ? 'active' : ''}`} key={name}><span>{String(i + 1).padStart(2, '0')}</span>{name}</div>)}</nav>
      <div className="sidebar-foot">ԵՐԿՈՒ ՀԻՄՆԱԴԻՐ ՏՆՕՐԵՆ<br/><small>Հավասար համակարգային իրավունքներ</small></div>
    </aside>
    <section className="content">
      <header><div><p className="eyebrow">SOVEREIGN MANAGEMENT / X1</p><h1>Կառավարման կենտրոն</h1><p className="sub">ARMSHIN · BARON աշխատանքային միջավայր</p></div><div className="status"><i/> ՀԻՄՔԻ ՏԱՐԲԵՐԱԿ</div></header>
      <section className="notice"><b>Սկզբնական կառուցվածք</b><p>Սա կառավարման համակարգի տեսողական և կոդային հիմքն է։ Մուտքի պաշտպանությունը և տվյալների բազայի միացումը դեռ միացված չեն։ Մինչև դրանք չստուգվեն, իրական հաճախորդների տվյալներ մի՛ մուտքագրեք։</p></section>
      <div className="section-head"><div><p className="eyebrow">WORKSPACE</p><h2>Համակարգի բաժիններ</h2></div><span>08 ՄՈԴՈՒԼ</span></div>
      <div className="grid">{modules.map(([name, desc, n]) => <article className="module" key={n}><div className="module-top"><span>{n}</span><b>↗</b></div><h3>{name}</h3><p>{desc}</p></article>)}</div>
      <footer>ARMSHIN © 2026 <span>BARON FOUNDATION · NOT PRODUCTION READY</span></footer>
    </section>
  </main>;
}
