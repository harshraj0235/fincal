import { module1Content } from './masterclassModule1';
import { module2Content } from './masterclassModule2';
import { module3Content } from './masterclassModule3';
import { module4Content } from './masterclassModule4';
import { module5Content } from './masterclassModule5';

export const lessonContent: Record<string, any> = {
  ...module1Content,
  ...module2Content,
  ...module3Content,
  ...module4Content,
  ...module5Content,
};
