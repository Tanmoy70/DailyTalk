import { Body, Controller, Get, Post, Param } from "@nestjs/common";



@Controller("session-membership-details")
export class SessionMembershipDetailController {

    //join in a specific room
    @Post('joinRoom')
    joinRoom(@Body() body: { userId: string, roomId: string }) {

    }


    //leave from a specific room
    @Post('leaveRoom')
    leaveRoom(@Body() body: { userId: string, roomId: string }) {
        // this is for leave a room
    }


    //get all members in a room
    @Get(':roomId/members')
    showAllMembers(@Param('roomId') roomId: string) {

    }
}