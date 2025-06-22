import React from 'react';
import { GitHubIcon } from './GitHubIcon';
import { InstagramIcon } from './InstagramIcon';
import { LinkedInIcon } from './LinkedInIcon';

const icons = {
  github: GitHubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];
  return <IconComponent {...props} />;
}; 