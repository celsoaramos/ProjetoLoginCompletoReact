import { Link } from 'react-router-dom';
import Label from '../Atoms/Label';

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <Label text={pageName} className='font-semibold' textSize='two' color='text-black' />
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/">
              <Label text='Home /' textSize='medium' color='text-[#1a6693]' className='cursor-pointer' />
            </Link>
          </li>
          { 
            pageName === 'Home' ? 
            ''
            :
            <li className="text-primary">
              <Label text={pageName} textSize='medium' color='text-black' />
            </li>
          }
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
