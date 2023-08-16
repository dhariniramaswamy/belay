export default function Reply({userName, body}) {
    console.log({userName});
    console.log({body});

    return (
    <div className="reply-container">
        <span class="username">{userName}</span>
            <div className="reply-body">
                {body}
            </div>
    </div>
    );
}