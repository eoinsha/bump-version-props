#!/usr/bin/env node
'use strict'

const fs = require('fs')
const propertiesParser = require('properties-parser')
const semver = require('semver')

const [,, gradleFilePath, level = 'patch'] = process.argv

try {
  if (!gradleFilePath || !fs.statSync(gradleFilePath).isFile()) {
    handleBadPath()
  }
} catch (e) {
  handleBadPath()
}

const props = propertiesParser.createEditor(gradleFilePath)

const versionName = props.get('versionName')
const versionCode = props.get('versionCode')

props.set('versionName', semver.inc(versionName, level))
props.set('versionCode', '' + (parseInt(versionCode) + 1))

props.save()


function printUsage () {
  console.error(`
Usage:
  ${process.argv[0]} propertiesPath <level>

  propertiesPath - The path to the version properties file containing versionCode and versionName properties
  level - The semver level to bump (default to patch)
`)
}

function handleBadPath () {
  console.error(`Invalid gradle build file path: ${gradleFilePath}`)
  printUsage()
  process.exit(1)
}

