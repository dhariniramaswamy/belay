export default function Reply({userName, body}) {
    console.log({userName});
    console.log({body});

    return (
    <>
        <p>{userName}</p>
        <p>{body}</p>
    </>
    );
}