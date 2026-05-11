import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramGroup } from './schemas/program-group.schema';
import { ProgramTrack } from './schemas/program-track.schema';
import { UpsertProgramGroupDto } from './dto/program-group.dto';
import { UpsertProgramTrackDto } from './dto/program-track.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(ProgramGroup.name)
    private readonly groupModel: Model<ProgramGroup>,
    @InjectModel(ProgramTrack.name)
    private readonly trackModel: Model<ProgramTrack>,
  ) {}

  listGroups() {
    return this.groupModel.find({}).sort({ order: 1, createdAt: -1 });
  }

  async createGroup(dto: UpsertProgramGroupDto) {
    return this.groupModel.create(dto);
  }

  async updateGroup(id: string, dto: UpsertProgramGroupDto) {
    const updated = await this.groupModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Group not found');
    return updated;
  }

  async deleteGroup(id: string) {
    const deleted = await this.groupModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Group not found');
    return { message: 'Group removed' };
  }

  listTracks() {
    return this.trackModel
      .find({})
      .populate('group')
      .sort({ order: 1, createdAt: -1 });
  }

  async getTrackBySlug(slug: string) {
    const track = await this.trackModel.findOne({ slug }).populate('group');
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async createTrack(dto: UpsertProgramTrackDto) {
    return this.trackModel.create({
      ...dto,
      targetAudience: dto.targetAudience ?? [],
      syllabusItems: dto.syllabusItems ?? [],
      formats: dto.formats ?? [],
    });
  }

  async updateTrack(id: string, dto: UpsertProgramTrackDto) {
    const updated = await this.trackModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        targetAudience: dto.targetAudience ?? [],
        syllabusItems: dto.syllabusItems ?? [],
        formats: dto.formats ?? [],
      },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Track not found');
    return updated;
  }

  async deleteTrack(id: string) {
    const deleted = await this.trackModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Track not found');
    return { message: 'Track removed' };
  }
}
