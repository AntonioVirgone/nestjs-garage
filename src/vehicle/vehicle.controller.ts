import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';

@Controller('vehicle')
export class VehicleController {
    @Get()
    async getVehicles() {
        return [
            {
                id: 12,
                brand: "FIAT",
                model: "Grande Punto"
            }
        ];
    }
}
