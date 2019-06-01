class UserManager {
    constructor() {
        this.user = {
            username: '',
            friends: [],
            otherUsers: []
        }
    }

    async getUserData(userData) {
        await $.post(`/login`, userData)
        let freshData = await $.get('/dashboard')
        this.user.username = freshData.user.username
        this.user.friends = freshData.user.friends
        // this.user.friends = freshData.users.find(u => u.username === freshData.user.username).friends
        let currentUserIndex = freshData.users.findIndex(u => u.username === freshData.user.username)
        freshData.users.splice(currentUserIndex, 1)
        this.user.otherUsers = freshData.users
    }

    async addFriend(friend) {
        let friendsArray = await $.ajax({
            method: "PUT",
            url: `addFriend/${this.user.username}/${friend}`,
            success: function (userData) {
                console.log(`${friend} added as a friend`)
                return userData.friends
            }
          
        })
        this.user.friends = friendsArray
    }

}


