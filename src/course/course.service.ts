import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private CourseModel: Model<Course>) { }
  async create(CreateCourseDto: CreateCourseDto) {

    return await this.CourseModel.create({
      name: CreateCourseDto.name,
      description: CreateCourseDto.description,
      level: CreateCourseDto.level,
      price: CreateCourseDto.price,
    });
  }

  findAll() {
    return `This action returns all course`;
  }

  async findOne(id: string) {
    return await this.CourseModel.findById({ _id: id });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
