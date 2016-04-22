# Git Refs
[![Build Status][ci-badge]][ci-badge-link]
[![Dependency Status][david-badge]][david-badge-link]
[![devDependency Status][david-dev-badge]][david-dev-badge-link]

JavaScript implementation to get the git commit hashes for different references.

* [x] current branch (current)
* [x] local branches (heads)
* [x] remote branches (remotes)
* [ ] tags (tags)

Tags aren't currently implemented, because they require being able to read the tag commit object. The other references just require reading the file contents.

## Usage

```bash
npm install @sinet/git-refs --save
```

### Example
```javascript
const gitRefs = require( '@sinet/git-refs' );

gitRefs( '/path/to/.git', function ( error, refs ) {
	if ( error ) {
		return console.log( error );
	}

	console.log( "refs.current.head:", refs.current.head );
	console.log( refs );
} );
```

## Contributing
All pull requests must follow [coding conventions and standards](https://github.com/sinet/coding-conventions).

[david-badge]: https://david-dm.org/sinet/git-refs.svg
[david-badge-link]: https://david-dm.org/sinet/git-refs
[david-dev-badge]: https://david-dm.org/sinet/git-refs/dev-status.svg
[david-dev-badge-link]: https://david-dm.org/sinet/git-refs
[david-dev-badge-link]: https://david-dm.org/sinet/git-refs#info=devDependencies
[ci-badge]: https://circleci.com/gh/sinet/git-refs.svg?style=shield
[ci-badge-link]: https://circleci.com/gh/sinet/git-refs
