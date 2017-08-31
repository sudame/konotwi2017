$(function () {

    let db = firebase.database();

    db.ref("/candidates_list/").once("value").then(function (snapshot) {
        let usersStr = snapshot.val();
        let userArray = usersStr.replace(/ /g, "").split(",");
        console.log(userArray);
    }, function (e) {
        console.log(e.code);
    });

    db.ref("/candidates/").once("value").then(function (snapshot) {
        let candidatesObj = snapshot.val();
        Object.keys(candidatesObj).forEach(function (key) {
            let candidate = candidatesObj[key];
            console.log(candidate.profile_banner_url);
            $("main").append('<div class="candidate-card"><img class="bannar" src="' + candidate.profile_banner_url + '" alt="hello" onerror="this.src=\'image/space.png\'"><img class="profile" src="' + candidate.profile_image_url + '" alt=""><div class="name"><div class="display-name">' + candidate.display_name + '</div><div class="screen-name">@' + candidate.screen_name + '</div></div><a class="follow-button" href="https://twitter.com/intent/follow?screen_name=' + candidate.screen_name + '">Follow</a><div class="description">' + candidate.description + '</div><div class="footer"><div><div>follower</div><div>' + candidate.follower_count + '</div></div><div><div>follow</div><div>' + candidate.friends_count + '</div></div><div><div>Tweet</div><div>' + candidate.statuses_count + '</div></div></div><div class="vote-button-wrapper"><div class="vote-button" data-uid="' + key + '">投票する</div></div></div>');
        });
        vote();
    }, function (e) {
        console.log(e.code);
    });
});


function vote() {
    $(".vote-button").on('click', function () {
        firebase.database().ref("/candidates/" + $(this).attr("data-uid") + "/").transaction(function (candidate) {
            if (candidate) {
                if (candidate.vote_count) {
                    candidate.vote_count++;
                    candidate.vote_count = candidate.vote_count.toString();
                } else {
                    candidate.vote_count = "1";
                }
            }
            return candidate;
        });
    });
}