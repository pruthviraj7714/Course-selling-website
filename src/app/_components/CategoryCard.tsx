import { CodeXml, WebhookIcon } from "lucide-react";
import Link from "next/link";

const CategoryCard = ({category, Clink, CIcon} : {category : string, Clink : string, CIcon : any}) => {
    const colors = ["blue","sky","yellow","red","violet","pink"];
    let randomColor = colors[Math.floor(Math.random()*colors.length)];

  return (
    <Link href={`courses/${Clink}`} className={`w-70 h-20 flex justify-center items-center gap-3 bg-primary font-serif text-xl`}>
        <span className="mr-2">
          {category}
        </span>
         <CIcon  size={30}/>
    </Link>
  )
}

export default CategoryCard