import Link from 'next/link';
import Wrapper from "@/components/wrappers/Wrapper";
import {Button} from "@/components/ui/button"
import Image from 'next/image';

export default function Custom404 () {
  return (
    <Wrapper className="my-auto flex flex-col items-center justify-center">
        <div>
          <div className='flex items-end justify-between'>
            <h1 className="text-2xl font-bold">404 #Mathew<br/>Page non trouvée</h1>
            <Image src="/cross_logo.png" width={150} height={150} alt="le logo de l'app barré" />
          </div>
          <p className='m-5 font-semibold'>
              Il semble que la page que vous recherchez n'existe pas.<br/>
              Retournez à l'accueil ou explorez d'autres sections.
          </p>
          <Link href="/">
            <Button className="transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2 h-10 px-4 py-2 w-full tracking-wider flex items-center gap-2">Retour à l'accueil</Button>
          </Link>
        </div>
    </Wrapper>
  );
};
