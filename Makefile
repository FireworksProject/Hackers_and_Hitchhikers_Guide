DIR_PREFIX = .

SRC_DIR = ${DIR_PREFIX}/src
BUILD_DIR = ${DIR_PREFIX}/build
DIST_DIR = ${DIR_PREFIX}/dist

SOURCES := $(patsubst ${SRC_DIR}/%.md, %, $(wildcard ${SRC_DIR}/*.md))
DEEP_SOURCES := $(patsubst ${SRC_DIR}/%.md, %, $(wildcard ${SRC_DIR}/**/*.md))

MARKDOWN = perl ${BUILD_DIR}/Markdown.pl

all: docs
	@@echo "Script build complete."

docs:
	@@echo "Converting markdown files..."
	@@for dir in $$(find ${SRC_DIR} -type d | sed 's/src/dist\/docs/') ; do \
		mkdir -p $$dir ; \
	done
	@@for f in ${SOURCES} ; do \
		${MARKDOWN} ${SRC_DIR}/$$f.md > ${DIST_DIR}/docs/$$f.html ; \
	done
	@@for f in ${DEEP_SOURCES} ; do \
		${MARKDOWN} ${SRC_DIR}/$$f.md > ${DIST_DIR}/docs/$$f.html ; \
	done

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}/docs
