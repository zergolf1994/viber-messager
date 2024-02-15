import { createContext } from 'react';
import { ModalsContextProps } from './types';


export const ModalsContext = createContext<ModalsContextProps>(null as any);
ModalsContext.displayName = 'ModalsContext';