# Sinet Git Refs

JavaScript implementation to get the git commit hashes for different references.

* [x] current branch (current)
* [x] local branches (heads)
* [x] remote branches (remotes)
* [ ] tags (tags)

Tags aren't currently implemented, because they require being able to read the tag commit object. The other references just require reading the file contents.

## Usage

```bash
npm install sinet-git-refs --save
```

### Example
```javascript
var gitRefs = require( 'sinet-git-refs' );

gitRefs( '/path/to/.git', function ( error, refs) {
	if ( error ) {
		return console.log( error );
	}

	console.log( "refs.current.head:", refs.current.head );
	console.log( refs );
} );
```

## Contributing
All pull requests must follow [coding conventions and standards](https://github.com/School-Improvement-Network/coding-conventions).
