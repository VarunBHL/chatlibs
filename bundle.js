(function() {
    console.log("TEST");
    
    var chatHTML = `
        <div id="center-text">
            <h2>BHL - Smart Assist</h2>
            <p>Version 0.1 Prototype</p>
        </div>
        <div id="body"> 
            <i><img id="chat-circle" class="chatbot-logo" src="https://chatlibs.onrender.com/images/chat-bot.png" alt=""></i>
            <div class="chat-box">
                <div class="chat-box-header">
                    BHL - SmartAssist
                    <span class="chat-box-toggle"><img src="/images/close.png"  class="close-button"></span>
                </div>
                <div class="chat-box-body">
                    <div class="chat-box-overlay"></div>
                    <div class="chat-logs"></div>
                </div>
                <div class="chat-input">      
                    <form>
                        <input type="text" id="chat-input" placeholder="Send a message..."/>
                        <button type="submit" class="chat-submit" id="chat-submit"><img class="send-logo" src="/images/send.png" alt=""></button>
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
            flex-direction: column; 
            justify-content: center;
            align-items: center;  
            height: 100%;
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
            display: none;
            background: #efefef;
            position: fixed;
            right: 30px;
            bottom: 50px;  
            width: 350px;
            max-width: 85vw;
            max-height: 100vh;
            border-radius: 5px;  
            box-shadow: 0px 5px 35px 9px #ccc;
        }
        .chat-box-toggle {
            float: right;
            margin-right: 15px;
            cursor: pointer;
        }
        .chat-box-header {
            background: #2d2d2d;
            height: 38px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px; 
            color: #b3a662;
            text-align: center;
            font-size: 20px;
            padding-top: 17px;
        }
        .chat-box-body {
            position: relative;  
            height: 370px;  
            border: 1px solid #ccc;  
            overflow: hidden;
        }
        .chat-box-body:after {
            content: "";
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
            position: absolute;
            height: 100%;
            width: 100%;
            opacity: .06;  
            top: 0;
            left: 0;
        }
        .chat-logs {
            padding: 15px;  
            height: 250px;  
            overflow-y: scroll;  
            overflow-x: hidden;  
            background: #FFF;  
        }
        .chat-input {
            padding: 10px;  
            background: #FFF;  
        }
        .chat-input form {
            display: flex;  
            align-items: center;
        }
        .chat-input input {
            width: 87%;
            border: 1px solid #eee;  
            border-radius: 3px;  
            padding: 10px 10px;
            font-size: 14px;  
            color: #666;  
            outline: none;  
            font-weight: 300;
        }
        .chat-input input:focus {
            border: 1px solid #ccc;
        }
        .chat-input button {
            width: 10%; 
            background: #2d2d2d;  
            border: none;  
            padding: 10px 0;  
            cursor: pointer;  
            border-radius: 3px;  
            margin-left: 8px;
            color: #b3a662;
            font-size: 20px;  
        }
        .chat-input button:hover {
            background: #353535;
        }
        .chat-input button:focus {
            outline: none;
        }
        .chat-bubble {
            background: #2d2d2d;  
            padding: 10px 15px;
            border-radius: 50px;  
            margin-bottom: 15px;  
            font-size: 13px;  
            color: #b3a662;  
            font-weight: 300;
            line-height: 1.4;  
            position: relative;
            animation: fadeIn 1s ease-in-out;
            -webkit-animation: fadeIn 1s ease-in-out;
        }
        .chat-bubble:before {
            content: '';
            position: absolute;  
            top: 0; 
            width: 0; 
            height: 0;
        }
        .chat-bubble.user:before {
            border-bottom: 10px solid transparent;
            border-right: 10px solid #2d2d2d;
            left: -6px;
        }
        .chat-bubble.bot:before {
            border-bottom: 10px solid transparent;
            border-left: 10px solid #2d2d2d;
            right: -6px;
        }
        .chat-bubble.bot {
            background: #2d2d2d;
            color: #b3a662;
            align-self: flex-start;
        }
        .bot-msg {
            width: 80%;
            display: flex;
        }
        .bot-msg img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            position: relative;
            top: 2px;
        }
        .chat-bubble.user {
            background: #2d2d2d;
            color: #b3a662;
            align-self: flex-end;
        }
        @-webkit-keyframes fadeIn {
            0% { opacity: 0; transform: scale(.3) }
            100% { opacity: 1; transform: scale(1) }
        }
        @keyframes fadeIn {
            0% { opacity: 0; transform: scale(.3) }
            100% { opacity: 1; transform: scale(1) }
        }
    `;

    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = chatCSS;
    } else {
        style.appendChild(document.createTextNode(chatCSS));
    }
    document.head.appendChild(style);

    var body = document.querySelector('body');
    var chatDiv = document.createElement('div');
    chatDiv.innerHTML = chatHTML;
    body.appendChild(chatDiv);
})();
