// import User from 'src/user/entities/user.entity';
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   OneToOne,
//   JoinTable,
//   JoinColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   RelationId,
// } from 'typeorm';
// import { Role_name } from '../../common/types/user-role.type';

// @Entity()
// class Role {
//   @PrimaryGeneratedColumn()
//   public id: number;

//   @Column({ type: 'enum', enum: Role_name, default: Role_name.Level_0 })
//   role_name: Role_name;

//   @CreateDateColumn()
//   createdDate: Date;

//   @UpdateDateColumn()
//   updatedDate: Date;

//   @OneToOne(() => User, (user: User) => user.wallet)
//   public owner: User;
// }

// export default Role;
