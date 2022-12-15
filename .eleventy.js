const { DateTime } = require('luxon')
const fs = require('fs')
const path = require('path')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginNavigation = require('@11ty/eleventy-navigation')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const postCss = require('postcss')
const atImport = require('postcss-import')
const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const CleanCSS = require('clean-css')
const postcss100vh = require('postcss-100vh-fix')

const cssTemplate = path.resolve(__dirname, './_includes/tailwind.css')
const cssCode = fs.readFileSync(cssTemplate, 'utf8')

module.exports = function (eleventyConfig) {
    // Copy the `img` and `css` folders to the output
    eleventyConfig.addPassthroughCopy('img')
    eleventyConfig.addPassthroughCopy('fonts')
    eleventyConfig.addPassthroughCopy('styles')

    // Add plugins
    eleventyConfig.addPlugin(pluginRss)
    eleventyConfig.addPlugin(pluginSyntaxHighlight)
    eleventyConfig.addPlugin(pluginNavigation)

    // Add Postcss and Tailwindcss
    eleventyConfig.on('eleventy.after', async (changedFiles) => {
        console.log('changed fired !')
        postCss([tailwind, postcss100vh, autoprefixer])
            .use(atImport)
            .process(cssCode, {
                from: cssTemplate,
            })
            .then(
                (r) => {
                    const cssPath = path.resolve(
                        __dirname,
                        './_site/styles/main.css'
                    )
                    const minCss = new CleanCSS().minify(r.css).styles
                    fs.writeFileSync(cssPath, minCss)
                },
                (e) => console.error(e)
            )
    })
    eleventyConfig.addFilter('isDraft', function (obj) {
        let isDraft = obj
        if (typeof obj === 'object') {
            const hasData = obj.hasOwnProperty('data')
            if (hasData) {
                const { data } = obj
                const hasDraft = data.hasOwnProperty('draft')
                if (hasDraft) {
                    const { draft } = data
                    if (draft) {
                        isDraft = false
                    }
                }
            }
        }

        return isDraft
    })
    eleventyConfig.addFilter('log', async (cnt) => {
        console.log('================', { cnt }, this)
        return cnt
    })
    eleventyConfig.addFilter('category', (cnt) => {
        const paths = cnt.split('/')
        const navigation = {
            projects: 'پروژه‌ها',
            posts: 'پست‌ها',
        }
        return navigation[paths[1]]
    })
    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'Asia/Tehran',
            locale: 'fa',
        })
            .reconfigure({ outputCalendar: 'persian' })
            .toFormat('dd LLL yyyy')
    })

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'Asia/Tehran',
        }).toFormat('yyyy-LL-dd')
    })

    eleventyConfig.addFilter('tillNow', (dateObj) => {
        const newDate = DateTime.fromJSDate(dateObj, {
            zone: 'Asia/Tehran',
            locale: 'fa',
        })
        const expired = newDate.diffNow() < 0
        if (expired) {
            return 'تاریخ دقیقی از انتشار آن در دست نیست'
        }
        const dateTimeOf = newDate
            .diffNow(['hours', 'days'], { conversionAccuracy: 'casual' })
            .toHuman()
        return `-${dateTimeOf} تا انتشار`
    })

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter('head', (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return []
        }
        if (n < 0) {
            return array.slice(n)
        }

        return array.slice(0, n)
    })

    // Return the smallest number argument
    eleventyConfig.addFilter('min', (...numbers) => {
        return Math.min.apply(null, numbers)
    })

    function filterTagList(tags) {
        return (tags || []).filter(
            (tag) =>
                ['all', 'nav', 'post', 'posts', 'project', 'projects'].indexOf(
                    tag
                ) === -1
        )
    }

    eleventyConfig.addFilter('filterTagList', filterTagList)

    // Create an array of all tags
    eleventyConfig.addCollection('tagList', function (collection) {
        let tagSet = new Set()
        collection.getAll().forEach((item) => {
            ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
        })

        return filterTagList([...tagSet])
    })

    // Customize Markdown library and settings:
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.ariaHidden({
            placement: 'before',
            class: 'direct-link',
            symbol: '#',
            level: [1, 2, 3, 4],
        }),
        slugify: eleventyConfig.getFilter('slug'),
    })
    eleventyConfig.setLibrary('md', markdownLibrary)

    // Override Browsersync defaults (used only with --serve)
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('_site/404.html')

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.writeHead(404, {
                        'Content-Type': 'text/html; charset=UTF-8',
                    })
                    res.write(content_404)
                    res.end()
                })
            },
        },
        ui: false,
        ghostMode: false,
    })

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: ['md', 'njk', 'html', 'liquid'],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: 'njk',

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: 'njk',

        // -----------------------------------------------------------------
        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Don’t worry about leading and trailing slashes, we normalize these.

        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for link URLs (it does not affect your file structure)
        // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

        // You can also pass this in on the command line using `--pathprefix`

        // Optional (default is shown)
        pathPrefix: '/',
        // -----------------------------------------------------------------

        // These are all optional (defaults are shown):
        dir: {
            input: '.',
            includes: '_includes',
            data: '_data',
            output: '_site',
        },
    }
}
