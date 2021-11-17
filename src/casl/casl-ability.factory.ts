import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "src/enums/Action";
import { Profile } from "src/profile/profile.entity";
import { User } from "src/users/user.entity";

type Subjects = InferSubjects<typeof Profile | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User, params: { id: string; }) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.usergroup.groupname === 'Admin') {
      can(Action.Manage, 'all'); // read-write access to everything
    }
    if(params.id){
      if (parseInt(params.id) === user.id) { // only owner and admin can access
        can(Action.Read, User);
        can(Action.Update, User);
        can(Action.Delete, User);
      } else { // only owner can access
        cannot(Action.Read, User);
        cannot(Action.Update, User);
        cannot(Action.Delete, User);
      }
      if (parseInt(params.id) === user.profile.id){
        can(Action.Update, Profile);
      }else {
        cannot(Action.Update, Profile);
      }
      
    }else{
      user.usergroup.userGroupRights.map(rights => {
        switch (rights.resources.resourcename) {
          case 'User':
              if (rights.create.create) {
                can(Action.Create, User);
              }if(rights.update.update){
                can(Action.Update, User);
              }if(rights.delete.delete){
                can(Action.Delete, User);
              }if(rights.read.read){
                can(Action.Read, User);
              }
            break;
          case 'Profile':
              if (rights.create.create) {
                can(Action.Create, Profile);
              }if(rights.update.update){
                can(Action.Update, Profile);
              }if(rights.delete.delete){
                can(Action.Delete, Profile);
              }if(rights.read.read){
                can(Action.Read, Profile);
              }
            break;  
        
          default:
            break;
        } 
      })
    }
    

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
