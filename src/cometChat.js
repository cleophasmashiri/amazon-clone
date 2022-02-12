import { CometChat } from '@cometchat-pro/chat';

const loginCometChatUser = async (uid) => {
    try {
        const user = await CometChat.login(
            uid,
            process.env.REACT_APP_COMETCHAT_AUTH_KEY
        );
        console.log('Login succesfull');
    } catch (error) {
        console.log('Login error', error);
    }
};

const logoutCometChatUser = async (uid) => {
    try {
        const user = await CometChat.logout();
        console.log('Logout succesfull');
    } catch (error) {
        console.log('Logout error', error);
    }
};


const registerCometChatUser = async (name, uid) => {
    const user = new CometChat.User(uid);
    user.setName(name);
    try {
        const user = await CometChat.createUser(
            user,
            process.env.REACT_APP_COMETCHAT_AUTH_KEY
        );i
        console.log('register new user succesfull');
    } catch (error) {
        console.log('register new user error', error);
    }
};

const addCometChatGroup = async (GUID, name, icon, participants) => {
    const memberList = participants.map((participant) => {
        return new CometChat.GroupMember(
            participant, 
            CometChat.GROUP_MEMBER_SCOPE
        );
    });

    const group = new CometChat.Group(
        GUID,
        name,
        CometChat.GROUP_TYPE.PRIVATE,
        '',
        icon
    );
    
    try {
        const createdGroup = CometChat.createGroup(group);
        console.log('Created group', createdGroup);
        const response = CometChat.addMembersToGroup(
            createdGroup.getGuid(),
            memberList,
            []
            );
            console.log('response', response);
    } catch (error) {
        console.log('Created group error', error);
    }

};

export {
    CometChat,
    loginCometChatUser,
    logoutCometChatUser,
    registerCometChatUser,
    addCometChatGroup
};