import { Controller, Get } from "@nestjs/common";
@Controller()
export class AppController {
  constructor() {}
  @Get()
  health() {
    return {
      status: "200",
      message: "NestJS application is running",
    };
  }
}
