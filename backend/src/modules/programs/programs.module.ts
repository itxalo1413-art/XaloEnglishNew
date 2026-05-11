import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import {
  ProgramGroup,
  ProgramGroupSchema,
} from './schemas/program-group.schema';
import {
  ProgramTrack,
  ProgramTrackSchema,
} from './schemas/program-track.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgramGroup.name, schema: ProgramGroupSchema },
      { name: ProgramTrack.name, schema: ProgramTrackSchema },
    ]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
