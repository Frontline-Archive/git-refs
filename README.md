# Git Refs
[![Build Status][travis-badge]][travis-badge-link]
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
var gitRefs = require( '@sinet/git-refs' );

gitRefs( '/path/to/.git', function ( error, refs ) {
	if ( error ) {
		return console.log( error );
	}

	console.log( "refs.current.head:", refs.current.head );
	console.log( refs );
} );
```

## Contributing
All pull requests must follow [coding conventions and standards](https://github.com/School-Improvement-Network/coding-conventions).

[david-badge]: https://david-dm.org/School-Improvement-Network/git-refs.svg
[david-badge-link]: https://david-dm.org/School-Improvement-Network/container-status
[david-dev-badge]: https://david-dm.org/School-Improvement-Network/container-status/dev-status.svg
[david-dev-badge-link]: https://david-dm.org/School-Improvement-Network/container-status
[david-dev-badge-link]: https://david-dm.org/School-Improvement-Network/container-status#info=devDependencies
[travis-badge]: https://travis-ci.org/School-Improvement-Network/container-status.svg
[travis-badge-link]: https://travis-ci.org/School-Improvement-Network/container-status
