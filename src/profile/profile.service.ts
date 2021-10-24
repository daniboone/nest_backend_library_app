import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/CreateProfile.dto';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/UpdateProfile.dto';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {}

    fillCreateDto(createProfileDto: CreateProfileDto){
        const profile = new Profile();

        profile.name = createProfileDto.name;
        profile.surname = createProfileDto.surname;
        profile.address = createProfileDto.address;
        profile.email_address = createProfileDto.email_address;
        profile.phone_number = createProfileDto.phone_number;

        return profile;
    }

    
    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
        
        const profile = this.fillCreateDto(createProfileDto);

        return await this.profileRepository.save(profile);
    }

    async findAll(): Promise<Profile[]> {
        return await this.profileRepository.find();
    }

    async findOne(id: number): Promise<Profile> {
        return await this.profileRepository.findOne(id);
    }

    async findByEmail(email_address: string): Promise<Profile | undefined> {
        return await this.profileRepository.findOne({email_address});
    }

    async update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        const editedProfile = await this.profileRepository.findOne(id);

        editedProfile.name = updateProfileDto.name;
        editedProfile.surname = updateProfileDto.surname;
        editedProfile.address = updateProfileDto.address;
        editedProfile.email_address = updateProfileDto.email_address;
        editedProfile.phone_number = updateProfileDto.phone_number;
        editedProfile.photo = updateProfileDto.photo;

        await this.profileRepository.save(editedProfile);
        return editedProfile;
    }

    async remove(id: number): Promise<void> {
        await this.profileRepository.delete(id);
    }
}