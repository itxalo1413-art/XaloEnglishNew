import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting } from './schemas/setting.schema';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private readonly settingModel: Model<Setting>,
  ) {}

  async getOne() {
    const doc = await this.settingModel.findOne({});
    return doc ?? (await this.settingModel.create({}));
  }

  async update(dto: UpdateSettingsDto) {
    const doc = await this.getOne();
    Object.assign(doc, dto);
    return doc.save();
  }
}
