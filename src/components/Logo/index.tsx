import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '@/routePaths';

type TProps = {
  src: string;
  title: string;
  width?: number;
  height?: number;
};

const Logo: React.FC<TProps> = ({ src, title, width, height }) => {
  return (
    <>
      <Link to={HOME_ROUTE}>
        <img src={src} alt={title} width={width} height={height} />
      </Link>
    </>
  );
};

export default Logo;
