import { CanActivate, UseGuards, Type } from '@nestjs/common';
import { PoliciesGuard } from 'src/casl/guards/police.guard';


export function Acl(authGuard: Type<CanActivate>) {
  return UseGuards(authGuard, PoliciesGuard)
}