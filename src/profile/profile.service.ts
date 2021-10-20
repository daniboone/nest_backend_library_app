import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './profile.entity';
import { ProfileInterface } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {}
    
    async create(profileDto: ProfileDto): Promise<Profile> {
        const profile = new Profile();
        profile.name = profileDto.name;
        profile.surname = profileDto.surname;
        profile.address = profileDto.address;
        profile.email_address = profileDto.email_address;
        profile.phone_number = profileDto.phone_number;
        profile.photo = profileDto.photo;

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

    async update(id: number, profileInterface: ProfileInterface): Promise<Profile> {
        const editedProfile = await this.profileRepository.findOne(id);

        editedProfile.name = profileInterface.name;
        editedProfile.surname = profileInterface.surname;
        editedProfile.address = profileInterface.address;
        editedProfile.email_address = profileInterface.email_address;
        editedProfile.phone_number = profileInterface.phone_number;
        editedProfile.photo = profileInterface.photo;

        await this.profileRepository.save(editedProfile);
        return editedProfile;
    }

    async remove(id: number): Promise<void> {
        await this.profileRepository.delete(id);
    }
}