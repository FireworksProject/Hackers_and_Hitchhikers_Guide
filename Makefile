SRC_DIR = src
BUILD_DIR = build

DIST_DIR = ./dist/html

SOURCES := $(patsubst ${SRC_DIR}/%.md, %, $(wildcard ${SRC_DIR}/*.md))

all: md

md:
	@@echo "Converting markdown files..."
	@@for f in ${SOURCES} ; do \
		perl ${BUILD_DIR}/Markdown.pl ${SRC_DIR}/$$f.md | \
		sed -e 's/<!-- yield -->/'$(</dev/stdin)'/g' ${BUILD_DIR}/layout.html > ${DIST_DIR}/$$f.html ; \
	done

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
