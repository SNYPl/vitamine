import React from "react";
import style from "./style.module.scss";
import ParamInfo from "../shopPage/paramInfo/ParamInfo";
import Image from "next/image";

const About: React.FC = ({}) => {
  const introduction = [
    {
      img: "/images/about/1.png",
      title: "კარგი ხარისხი",
      info: "უმაღლესი ხარისხი პროდუქცია",
    },
    {
      img: "/images/about/2.png",
      title: "დაბალი ფასები",
      info: "ყველაზე დაბალ და შეღავათიან ფასად, ",
    },
    {
      img: "/images/about/3.png",
      title: "ამერიკული ბრენდები",
      info:
        "ამერიკული ტოპ ბრენდების პროდუქცია, რომელებსაც ერთ-ერთი საუკეთესო პროდუქცია აქვთ",
    },
    {
      img: "/images/about/4.png",
      title: "უფასო მიტანა",
      info:
        "100 ლარის ზემოთ შენაძენზე, უფასოდ მოგიტანთ მისამართზე(თბილისის მასშტაბით)",
    },
  ];
  return (
    <section className={`${style.about}`}>
      <ParamInfo />

      <div className={`${style.aboutStory}`}>
        <h2>
          <span>ჩვენს </span> შესახებ
        </h2>
        <p>
          VitVit საქმიანობა დაფუძნებულია ხარისხიანი პროდუქციიის, პრემიუმ კლასის
          ვიტამინების, საკვები დანამატების და სხვა პროდუქციის იმპორტით
          საქართველოში. ჩვენი ჯგუფი გთავაზობთ ძალიან დაბალი ფასით უმაღლესი
          ხარისხის პროდიქციას ამერიკიდან. ( აქვს GMP) რომელიც ისევ და ისევ
          უზრუნველყოფს ხარისისხის უმაღლეს გარანტს
        </p>
        <p>
          ყველა პროდუქტის არის ორიგინალი შეფუთვით, ამერიკულ ტოპ ბრენდები ,
          გაუხსნელი და დაუზიანებელი. ყველა პროდუქტს აქვთ გავლილი შესაბამისი
          ტესტები(ამერიკაში) და არის სერთფიცირებული.
        </p>
      </div>

      <div
        className={`${style.whyUs}`}
        style={{ backgroundImage: "url(/images/about/whyUs.png)" }}
      >
        <h2>
          <span>რატომ</span> უნდა აგვირჩიოთ
        </h2>
        <div className={`${style.list}`}>
          {introduction.map((el: any, id: number) => (
            <article className={`${style.listItem}`} key={id}>
              <div className={`${style.listImg}`}>
                <Image src={el.img} alt="icon" width={30} height={27} />
              </div>
              <div className={`${style.listInfo}`}>
                <h5>{el.title}</h5>
                <p>{el.info}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
