<script>
	import HeaderArea from '$lib/components/header_area.svelte';
	import ArticleArea from '$lib/components/article_area.svelte';
	let attributes = JSON.parse(
		'{"title":"Five Advanced, Rarely Used Git Commands","subtitle":"Unlock the Power of Git with These Lesser-Known Commands","author":"Your Name","date":"2023-04-8","categories":["Software Development","Git","Shell Commands"],"tags":["git"]}'
	);
</script>

<svelte:head>
	<title>Five Advanced, Rarely Used Git Commands</title>
</svelte:head>
<HeaderArea {attributes} />
<ArticleArea>
	<pre><code class="hljs language-bash"
			>git bisect
</code></pre>
	<p>
		When dealing with large codebases and complex changes, it can be challenging to identify the
		specific commit that introduced a bug or broke functionality. git bisect is a powerful command
		that uses a binary search algorithm to quickly pinpoint the exact commit that caused the issue.
		To use git bisect, you&#39;ll need to provide a known good commit and a known bad commit. Git
		will then guide you through a series of steps, asking you to test and mark the commits as good
		or bad, until it narrows down the problematic commit.
	</p>
	<p>
		After a biset session, you can reset the repository to its original state using <code
			>git bisect reset</code
		>.
	</p>
	<pre><code class="hljs language-bash"
			>git reflog
</code></pre>
	<p>
		git reflog is a useful command for recovering lost commits, branches, or changes that you may
		have accidentally deleted or overwritten. The reflog maintains a record of all the HEAD
		references and branch tip updates, allowing you to navigate through your Git history and recover
		lost data. To view the reflog, simply run git reflog. To recover a lost commit, identify the
		desired commit&#39;s hash in the reflog output, then create a new branch pointing to that commit
		using <code>git branch &lt;new-branch-name&gt; &lt;commit-hash&gt;</code>.
	</p>
	<pre><code class="hljs language-bash"
			>git cherry-pick
</code></pre>
	<p>
		git cherry-pick allows you to apply the changes introduced by a specific commit from one branch
		onto another branch without merging the entire branch. This is useful when you want to include a
		specific bug fix or feature from another branch without incorporating all the changes from that
		branch. To cherry-pick a commit, first switch to the target branch using git checkout <target-branch-name
			>, then run git cherry-pick <commit-hash>.</commit-hash></target-branch-name
		>
	</p>
	<pre><code class="hljs language-bash"
			>git rev-parse
</code></pre>
	<p>
		git rev-parse is a versatile command that resolves various Git references, such as commit
		hashes, branch names, or tags, into their canonical form. This is useful when you need to
		programmatically retrieve the commit hash or other reference data in scripts or automation
		tasks. For example, to get the commit hash of the current HEAD, run git rev-parse HEAD. To
		resolve a branch name to its commit hash, use git rev-parse <branch-name>.</branch-name>
	</p>
	<pre><code class="hljs language-bash"
			>git clean
</code></pre>
	<p>
		When working on a project, it&#39;s common to accumulate untracked files, such as build
		artifacts, temporary files, or logs. These files can clutter your workspace and make it
		difficult to maintain a clean and organized environment. The git clean command helps you remove
		untracked files from your working directory. To see a list of untracked files that would be
		removed, run <code>git clean -n</code>. To actually remove the files, use
		<code>git clean -f</code>. To remove untracked directories as well, add the -d flag:
		<code>git clean -fd</code>.
	</p>
	<p>
		These commands may not be part of my everyday toolkit, knowing when and how to use them
		definitely comes in handy every now and then.
	</p>
</ArticleArea>
