// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Role_name } from 'src/common/types/user-role.type';
// import { Repository } from 'typeorm';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
// import Role from './entities/role.entity';

// @Injectable()
// export class RoleService {
//   constructor(
//     @InjectRepository(Role) private roleRepository: Repository<Role>,
//   ) {}
//   create(createRoleDto: CreateRoleDto) {
//     return 'This action adds a new role';
//   }

//   findAll() {
//     return `This action returns all role`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} role`;
//   }

//   async update(id: number, role_name: Role_name) {
//     return await this.roleRepository.update({ id }, { role_name: role_name });
//   }

//   remove(id: number) {
//     return `This action removes a #${id} role`;
//   }
// }
