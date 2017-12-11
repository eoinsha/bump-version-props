bump-version-props
===

Simple utility to bump a properties file containing `versionCode` and `versionName` properties.
Useful for incrementing Android `build.gradle` version properties in a CI/CD environment.

# Usage

```
bump-version-properties <version.properties> [patch|minor|major]
```

# References
https://www.npmjs.com/package/semver
