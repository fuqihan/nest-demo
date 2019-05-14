import { Module } from "@nestjs/common";
import { HistoryModule } from './history/history.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [HistoryModule, CompanyModule, UserModule],
})
export class MainModule {}
