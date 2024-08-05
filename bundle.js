(function() {
    var chatHTML = `
            <div id="center-text">
                <h2>BHL - Smart Assist</h2>
                <p>Version 0.1 Prototype</p>
            </div>
            <div id="body"> 
                <i><img id="chat-circle" class="chatbot-logo" src="../app/images/chat-bot.png" alt=""></i>
                <div class="chat-box">
                    <div class="chat-box-header">
                        BHL - SmartAssist
                        <span class="chat-box-toggle"><img src="../app/images/close.png"  class="close-button"></span>
                    </div>
                    <div class="chat-box-body">
                        <div class="chat-box-overlay">   
                        </div>
                    <div class="chat-logs">
                    </div><!--chat-log -->
                    </div>
                    <div class="chat-input">      
                        <form>
                            <input type="text" id="chat-input" placeholder="Send a message..."/>
                            <button type="submit" class="chat-submit" id="chat-submit"><img class="send-logo" src="../app/images/send.png" alt=""></button>
                        </form>      
                    </div>
                </div>
            </div>
    `;
    var chatCSS = `
            html, body {
                background: #efefef;      
                height:100%;  
            }
            #center-text {          
                display: flex;
                flex: 1;
                flex-direction:column; 
                justify-content: center;
                align-items: center;  
                height:100%;
            }
            .btn#my-btn {
                background: white;
                padding-top: 13px;
                padding-bottom: 12px;
                border-radius: 45px;
                padding-right: 40px;
                padding-left: 40px;
                color: #5865C3;
            }
            #chat-overlay {
                background: rgba(255,255,255,0.1);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: none;
            }
            .chat-box {
                display:none;
                background: #efefef;
                position:fixed;
                right:30px;
                bottom:50px;  
                width:350px;
                max-width: 85vw;
                max-height:100vh;
                border-radius:5px;  
                /*   box-shadow: 0px 5px 35px 9px #464a92; */
                box-shadow: 0px 5px 35px 9px #ccc;
            }
            .chat-box-toggle {
                    float:right;
                    margin-right:15px;
                    cursor:pointer;
            }
            .chat-box-header {
                background: #2d2d2d;
                height:38px;
                border-top-left-radius:5px;
                border-top-right-radius:5px; 
                color:#b3a662;
                text-align:center;
                font-size:20px;
                padding-top:17px;
            }
            .chat-box-body {
                position: relative;  
                height:370px;  
                height:auto;
                border:1px solid #ccc;  
                overflow: hidden;
            }
            .chat-box-body:after {
                content: "";
                background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
                opacity: 0.1;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                height:100%;
                position: absolute;
                z-index: -1;   
            }
            #chat-input {
                background: #f4f7f9;
                width:100%; 
                position:relative;
                height:47px;  
                padding-top:10px;
                padding-right:50px;
                padding-bottom:10px;
                padding-left:15px;
                border:none;
                resize:none;
                outline:none;
                border:1px solid #ccc;
                color:#888;
                border-top:none;
                border-bottom-right-radius:5px;
                border-bottom-left-radius:5px;
                overflow:hidden;  
            }
            .chat-input > form {
                margin-bottom: 0;
            }
            #chat-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                color: #ccc;
            }
            #chat-input::-moz-placeholder { /* Firefox 19+ */
                color: #ccc;
            }
            #chat-input:-ms-input-placeholder { /* IE 10+ */
                color: #ccc;
            }
            #chat-input:-moz-placeholder { /* Firefox 18- */
                color: #ccc;
            }
            .chat-submit {  
                position:absolute;
                bottom:3px;
                right:10px;
                background: transparent;
                box-shadow:none;
                border:none;
                border-radius:50%;
                color:#5A5EB9;
                width:35px;
                height:35px;  
            }
            .chat-logs {
                padding:15px; 
                height:370px;
                overflow-y:scroll;
            }

            @media only screen and (max-width: 500px) {
            .chat-logs {
                    height:40vh;
                }
            }

            .chat-msg.user > .msg-avatar img {
                width:45px;
                height:45px;
                border-radius:50%;
                float:left;
                width:15%;
            }

            .chat-msg.self > .msg-avatar img {
                width:45px;
                height:45px;
                border-radius:50%;
                float:right;
                width:15%;
            }

            .cm-msg-text {
                background:white;
                padding:10px 15px 10px 15px;  
                color:#b3a662;
                max-width:75%;
                float:left;
                margin-left:10px; 
                position:relative;
                margin-bottom:20px;
                border-radius:30px;
            }
            .chat-msg {
                clear:both;    
            }
            .chat-msg.self > .cm-msg-text {  
                float:right;
                margin-right:10px;
                background: #2d2d2d;
                color:#b3a662;
            }
            .cm-msg-button>ul>li {
                list-style:none;
                float:left;
                width:50%;
            }
            .cm-msg-button {
                clear: both;
                margin-bottom: 70px;
            }
            .chatbot-logo {
                position: fixed;
                bottom: 50px;
                right: 50px; 
                padding: 28px;
                cursor: pointer;
                width: 4%;
            }
            .send-logo {
                width: 95%;
            }
            .close-button {
                width: 47%;
                margin-top: -3px;
            }
            #predefined-intents {
                display: flex;
                flex-direction: column;  /* Stack buttons vertically */
                justify-content: space-around;
                margin-top: 10px;
            }
            .intent-btn {
                background-color: #2d2d2d;
                border-style: solid;
                border-color: #b3a662;
                color: white;
                border-radius: 10px;
                padding: 10px 20px;
                cursor: pointer;
                font-size: 14px;
                margin-bottom: 10px;  /* Add space between buttons */
            }
            .intent-btn:hover {
                background-color: #b3a662;
            }
            .intent-body {
                color: #b3a662;
                max-width: 75%;
                float: left;
                margin-left: 70px; 
            }
        `;

     var chatJS = `
            var INDEX = 0;

            $("#chat-submit").click(function(e) {
                e.preventDefault();
                var msg = $("#chat-input").val();
                if(msg.trim() == '') {
                    return false;
                }
                if(msg.trim().toLowerCase() === 'history') {
                    fetch_history();
                } else {
                    generate_message(msg, 'self');
                }
            });

            function fetch_history() {
                $.ajax({
                    url: "http://127.0.0.1:5000/history",
                    type: "GET",
                    success: function(response) {
                        display_history(response);
                    },
                    error: function(error) {
                        console.log("Error:", error);
                    }
                });
            }

        function display_history(history) {
            $(".chat-logs").html(""); // Clear existing messages
            console.log(history)
            // history.forEach(entry => {
            //     generate_message(entry.user, 'self', false);
            //     generate_message(entry.bot, 'user', false);
            // });
        }

        function generate_intro(msg, type, animate =true) {
            INDEX++;

            var str="";
            var linkPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
            var formattedMsg = msg[0].replace(linkPattern, function(url) {
                return "<a href='" + url + "' target='_blank' class='chat-link'>Download PDF</a>";
            });
            str += "<div id='cm-msg-" + INDEX + "' class='chat-msg " + type + "'>";
            str += "          <span class='msg-avatar'>";
            str += "            <img src='" + (type === 'self' ? '../app/images/user.png' : '../app/images/customer-service.png') + "'>";
            str += "          </span>";
            str += "          <div class='cm-msg-text'>";
            str += formattedMsg;
            str += "          </div>";
            str += "          <div class='cm-msg-text'>";
            str += msg[1];
            str += "          </div>";
            str += "          <div class='intent-body'>";
            str += "           <div id='predefined-intents'>"
            str += "                 <button class='intent-btn' data-intent='Hotel Factsheets'>Hotel Factsheets</button> &nbsp;"
            str += "                 <button class='intent-btn' data-intent='Wedding Factsheets'>Wedding Factsheets</button> &nbsp;"
            str += "                 <button class='intent-btn' data-intent='Golf Factsheet'>Golf Factsheet</button> &nbsp;"
            str += "                 <button class='intent-btn' data-intent='Booking Information'>Booking Information</button> &nbsp;"
            str += "                 <button class='intent-btn' data-intent='Other Service'>Other Service</button> &nbsp;"
            str += "          </div>";
            str += "        </div>";
            $(".chat-logs").append(str);
            if(animate) {
                $("#cm-msg-" + INDEX).hide().fadeIn(300);
            }
            if(type === 'self') {
                $("#chat-input").val('');
            }
            $(".chat-logs").stop().animate({ scrollTop: 0 }, 1000);

            // Get intent onclick
            $('.intent-btn').off('click').on('click', function() {
                var intent = $(this).data('intent');
                handleIntentClick(intent);
            });
        }

        function handleIntentClick(intent) {
            if (intent === 'Hotel Factsheets') {
                processQuery(intent);
            } else {
                processQuery(intent);
            }
        }

        function processQuery(message) {
            $.ajax({
                url: "http://127.0.0.1:5000/ask",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ msg: message }),
                success: function(response) {
                    bot_writing("user");
                    setTimeout(function() {
                        // Remove typing indicator
                        $("#cm-msg-typing").remove();

                        generate_message(response.response, 'user');
                    }, 5000);
                    
                },
                error: function(error) {
                    generate_message("Sorry, I am not available today. If you have any query, please get in touch with us on <a href='tel:+23052593132'>+23052593132</a> or send us your queries on <a href='mailto:resa@beachcomber-holidays.com'>resa@beachcomber-holidays.com</a>", 'user');
                    console.log("Error:", error);
                }
            });
        }  

        function generate_message(msg, type, animate = true) {
            INDEX++;
            var username = null;
            var nameAsked = false;

            var str="";
            var linkPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
            var formattedMsg = msg.replace(linkPattern, function(url) {
                return "<a href='" + url + "' target='_blank' class='chat-link'>Download PDF</a>";
            });
            str += "<div id='cm-msg-" + INDEX + "' class='chat-msg " + type + "'>";
            str += "          <span class='msg-avatar'>";
            str += "            <img src='" + (type === 'self' ? '../app/images/user.png' : '../app/images/customer-service.png') + "'>";
            str += "          </span>";
            str += "          <div class='cm-msg-text'>";
            str += formattedMsg;
            str += "          </div>";
            str += "        </div>";

            $(".chat-logs").append(str);
            if(animate) {
                $("#cm-msg-" + INDEX).hide().fadeIn(300);
            }

            if(type === 'self') {
                $("#chat-input").val('');
            }

            $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
            if(type === 'self') {
                processQuery(msg);
            }
        }

        function bot_writing(type, animate=true) {
            INDEX++;

            var str = "";
            // Add typing indicator
            str += "<div id='cm-msg-typing' class='chat-msg " + type + "'>";
            str += "          <span class='msg-avatar'>";
            str += "            <img src='../app/images/customer-service.png'>";
            str += "          </span>";
            str += "          <div class='cm-msg-text'>";
            str += "            <span class='typing'>Agent is typing...</span>";
            str += "          </div>";
            str += "</div>";

            $(".chat-logs").append(str);
            if (animate) {
                $("#cm-msg-typing").hide().fadeIn(300);
            }
            $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
        }

        $('.close-button').click(function() {
            $(".chat-logs").empty();
        });

        $("#chat-circle").click(function() {
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
            generate_intro(["Welcome to Beachcomber Holidays. I'm your Virtual Assistance.", "How can I help you?"], 'user', false);
        });

        $(".chat-box-toggle").click(function() {
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
        });
     `;   

    var styleElement = document.createElement("style");
    styleElement.innerHTML = chatCSS;
    document.head.appendChild(styleElement);

    var chatElement = document.createElement("div");
    chatElement.innerHTML = chatHTML;
    document.body.appendChild(chatElement);

    var scriptElement = document.createElement("script");
    scriptElement.innerHTML = chatJS;
    document.body.appendChild(scriptElement);
})();
