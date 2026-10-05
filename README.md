My personal websites use the template from https://varadbhogayata.github.io/.

## Independent versions

- `my-page/`: complete original portfolio, published at https://chunzham.github.io/my-page/.
- `page/`: urban-studies portfolio, published at https://chunzham.github.io/page/.

Each directory contains its own HTML pages and `assets/` tree. Edit only the intended version; neither version loads files from the other or from the root assets directory. Local HTML links and script-generated photography URLs are relative to their own website directory. CSS image URLs remain relative to the CSS file. Preserve these conventions when adding content.

The urban-studies version has no resume files or resume navigation. Its About section is informed by the interests and methods described in Cornell's Urban and Regional Studies program, grounded in Chun's existing projects rather than written as a university-specific application essay:
https://aap.cornell.edu/planning/crp-academic-programs/bachelor-of-science-in-urban-and-regional-studies/

The root homepage is intentionally blank, with no redirect or links between versions. Previously published root-level article pages and assets are retained for old direct links; the two new websites do not depend on them. Both versions deploy together through this repository's GitHub Pages configuration, but their content and resources can be edited independently.

The directories are public, not access-controlled. Separate URLs do not hide the connection between the websites in the public repository.
