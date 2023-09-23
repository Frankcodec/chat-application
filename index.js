const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const users = [];
const threadList = [];

const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", async (req, res) => {
	const { email, password, username } = req.body;
	const id = generateID();
	const result = users.filter(
		(user) => user.email === email && user.password === password
	);
	if (result.length === 0) {
		const newUser = { id, email, username, password };
		users.push(newUser);

		return res.json({
			message: "account created successfully",
		});
	}
	res.json({
		error_message: "User already exists",
	});
	console.log({ email, password, username, id });
});

app.post("/api/login", (req, res) => {
	const { email, password } = req.body;
	const result = users.filter(
		(user) => user.email === email && user.password === password
	);
	if (result.length >= 1) {
		return res.json({
				message: "login successful",
				id: result[0].id,
			}) 
	}
	res.json({
		error_message: "Incorrect credentials",
	});
	
});

app.post("/api/create/thread", async (req, res) => {
	const { thread, userId } = req.body;
	const threadId = generateID();

	threadList.unshift({
		id: threadId,
		title: thread,
		userId,
		replies: [],
		likes: [],
	});

	res.json({
		message: "Thread created successfully",
		threads: threadList,
	})
	console.log({ thread, userId, threadId });
});

app.post("/api/thread/like", (req, res) => {
	const { threadId, userId } = req.body;
	const result = threadList.filter((thread) =>  thread.id === threadId);
	const threadLikes = result[0].likes;
	const authenticateReaction = threadLikes.filter((user) => user === userId);

	if (authenticateReaction.length === 0) {
		threadLikes.push(userId);
		return res.json({
			message: "you've reacted to the post",
		})
	}
	res.json({
		error_message: "you can only react once!",
	});
});

app.post("/api/thread/replies", (req, res) => {
	const { id } = req.body;
	const result = threadList.filter((thread) => thread.id === id);

	res.json({
		replies: result[0].replies,
		title: result[0].title,
	});
});

app.post("/api/thread/reply", (req, res) => {
	const { id, userId, reply } = req.body;
	const result = threadList.filter((thread) => thread.id === id);
	const user = users.filter((user) => user.id === userId);
	const replyId = generateID();

	result[0].replies.unshift({
		userId: user[0].id,
		name: user[0].username,
		text: reply,
		replyId: replyId,
	});
	res.json({
		message: "Reply sent",
	})
})

app.get("/api/all/threads", (req, res) => {
	res.json({
		threads: threadList,
	})
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});