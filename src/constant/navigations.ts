import { AiOutlineFileDone } from 'react-icons/ai';
import { GiWorld } from 'react-icons/gi';
import { ImImages, ImStack } from 'react-icons/im';
import { IoIosFlash } from 'react-icons/io';

export const sideNavigations = {
  matches: {
    icon: ImStack,
    text: 'MATCHES',
    isAvailable: false,
  },
  '/': {
    icon: ImImages,
    text: 'IMAGES',
    isAvailable: true,
  },
  cases: {
    icon: AiOutlineFileDone,
    text: 'CASES',
    isAvailable: false,
  },
  takedowns: {
    icon: IoIosFlash,
    text: 'TAKEDOWNS',
    isAvailable: false,
  },
  registers: {
    icon: GiWorld,
    text: 'REGISTERS',
    isAvailable: false,
  },
};
