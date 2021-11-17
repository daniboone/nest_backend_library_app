import { AppAbility } from '../casl/casl-ability.factory';
import { IPolicyHandler } from './interfaces/police.handler.interface';


type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
