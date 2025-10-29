import { ApiProperty } from "@nestjs/swagger";

export class CreateGradeDto {
    @ApiProperty()
    grade_name: string;
    @ApiProperty()
    grade_description?: string;
}
