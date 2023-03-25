<script>
	import HeaderArea from '$lib/components/header_area.svelte';
	import ArticleArea from '$lib/components/article_area.svelte';
	let attributes = JSON.parse(
		'{"title":"10 Git Beginner Commands You Should Know: Essential commands to get started with Git","author":"Alloys Mila","date":"2023-03-22","categories":["Development","Git"],"tags":["git","version-control","workflow","productivity"]}'
	);
</script>

<svelte:head>
	<title>10 Git Beginner Commands You Should Know: Essential commands to get started with Git</title
	>
</svelte:head>
<HeaderArea {attributes} />
<ArticleArea>
	<pre><code class="hljs language-bash"
			>git init
</code></pre>
	<p>
		The init command initializes a new Git repository in your current working directory. This is the
		first step to start tracking your project with Git. Simply navigate to your project&#39;s root
		folder in the command line and type <code>git init</code>.
	</p>
	<pre><code class="hljs language-bash"
			>git <span class="hljs-built_in">clone</span>
</code></pre>
	<p>
		The clone command allows you to create a copy of an existing remote repository on your local
		machine. This is useful when you want to work on a project that is already hosted on a platform
		like GitHub or GitLab. To clone a repository, run <code>git clone &lt;repository-url&gt;</code>.
	</p>
	<pre><code class="hljs language-bash"
			>git add
</code></pre>
	<p>
		git add is used to stage changes in your working directory for a commit. You can either add
		specific files or all changes at once by running <code>git add &lt;file-path&gt;</code> or
		<code>git add .</code>, respectively. Staging your changes allows you to selectively include
		changes in your next commit.
	</p>
	<pre><code class="hljs language-bash"
			>git commit
</code></pre>
	<p>
		The commit command saves your staged changes to the repository&#39;s history with a descriptive
		message. This is a crucial step to document your progress and make your code history easier to
		understand. Use the command <code>git commit -m &quot;Your commit message&quot;</code> to commit
		your changes.
	</p>
	<pre><code class="hljs language-bash"
			>git status
</code></pre>
	<p>
		<code>git status</code> gives you an overview of the current state of your working directory, including
		modified, staged, and untracked files. This command is helpful to review your changes before committing,
		ensuring you don&#39;t accidentally commit unwanted files or miss important changes.
	</p>
	<pre><code class="hljs language-bash"
			>git <span class="hljs-built_in">log</span>
</code></pre>
	<p>
		The log command displays a list of all the commits in the repository&#39;s history. This allows
		you to review previous changes, commit messages, and authors. To view the log with a more
		visually appealing format, use <code>git log --oneline --graph --decorate</code>.
	</p>
	<pre><code class="hljs language-bash"
			>git diff
</code></pre>
	<p>
		git diff shows the differences between your working directory and the latest commit. This is
		useful to review your changes before staging or committing them. To see the differences between
		the staged changes and the latest commit, use <code>git diff --staged</code>.
	</p>
	<pre><code class="hljs language-bash"
			>git checkout
</code></pre>
	<p>
		The checkout command allows you to switch between branches, commits, or files in your
		repository. To switch to a specific branch, run <code>git checkout &lt;branch-name&gt;</code>.
		If you want to discard changes in a specific file and revert it to the last committed state, use
		<code>git checkout -- &lt;file-path&gt;</code>.
	</p>
	<pre><code class="hljs language-bash"
			>git branch
</code></pre>
	<p>
		git branch lists all the branches in your repository and highlights the currently active branch.
		To create a new branch, run <code>git branch &lt;new-branch-name&gt;</code>. Remember, creating
		a new branch doesn&#39;t automatically switch you to that branch. Use <code>git checkout</code>
		to switch branches. For newer versions of Git, you can also use <code>git switch</code> to switch
		branches.
	</p>
	<pre><code class="hljs language-bash"
			>git merge
</code></pre>
	<p>
		The merge command combines the changes from one branch into another, typically used when merging
		feature branches into the main branch. To merge a branch, first checkout the target branch
		(e.g., main) and then run <code>git merge &lt;source-branch-name&gt;</code>.
	</p>
</ArticleArea>
