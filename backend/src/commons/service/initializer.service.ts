import { Injectable, OnModuleInit, Inject, forwardRef } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'



@Injectable()
export class Initializer implements OnModuleInit {
  constructor(
    /*@Inject(forwardRef(() => UserService)) private userService: UserService,*/
    @Inject(forwardRef(() => ConfigService)) private configService: ConfigService,
  ) {}

  async onModuleInit() {
    //await this.initialBackOfficeUsersConfig()
  }

  async initialBackOfficeUsersConfig() {
    const initialUsers = [
      {
        username: this.configService.get<string>('initAdmin')!,
        password: this.configService.get<string>('initAdminPassword')!,
      },
    ]
    /*await Promise.all(
      initialUsers.map(async user => {
        const userDB = await this.userService.findOneByFilter({
          where: { username: user.username },
        })
        if (!userDB) {
          try {
            await this.userService.create({
              username: user.username!,
              password: user.password!,
              role: 1/*Role.ADMIN,
              firstName: 'Super',
              lastName: 'Admin',
            })
          } catch (error) {}
        }
      }),
    )*/
  }
}
