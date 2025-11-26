import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMDk2ZDZiOC00N2RjLTQ2NDEtYjg2Zi05N2M2YWJkNzFmZmUiLCJlbWFpbCI6Im1pa2tpQGhpaXJpLmNvbSIsImlhdCI6MTc2NDE2NDgzMSwiZXhwIjoxNzY0MTY1NzMxfQ._ca-ZJkqttRT5NZq22RLXzlEQEO1z59YLXoS9Ed1LTY',
    description: 'The access token for the user',
  })
  access_token: string;
}
