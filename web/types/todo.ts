import type { paths } from '../backend-types/api';

export type Todo =
  paths['/todos']['post']['responses']['201']['content']['application/json'];
