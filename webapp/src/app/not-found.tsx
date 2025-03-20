import Link from 'next/link';
import Wrapper from "@/components/wrappers/Wrapper";
import {Button} from "@/components/ui/button"
import Image from 'next/image';

export default function Custom404 () {
  return (
    <Wrapper className="my-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            404<br />Page non trouvée
          </h1>
          <Image
            src="/cross_logo.png"
            width={120}
            height={120}
            alt="Logo error 404"
            className="mt-4 sm:mt-0"
          />
        </div>
        <p className="mt-6 text-center sm:text-left m-5 font-semibold">
          Il semble que la page que vous recherchez n&apos;existe pas.<br />
          Retournez à l&apos;accueil ou explorez d&apos;autres sections.
        </p>
        <div className="flex justify-center sm:justify-start">
          <Link href="/">
            <Button className="transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2 h-10 px-4 py-2 w-full sm:w-auto tracking-wider flex items-center gap-2">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};
