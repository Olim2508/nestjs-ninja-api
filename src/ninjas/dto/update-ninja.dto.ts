import { PartialType } from '@nestjs/mapped-types';
import {BaseNinjaDto} from './create-ninja.dto';

export class UpdateNinjaDto extends PartialType(BaseNinjaDto) {}
