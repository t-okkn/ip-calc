NAME     := ip-calc-practice
VERSION  := v0.0.1

DSTDIR  := /srv/http
USER    := http
GROUP   := http


run:
	@ng serve --host 0.0.0.0 --disable-host-check

build:
	@ng build

install: build
	@command cp -fr dist/$(NAME) $(DSTDIR)/
	@chown -R $(USER):$(GROUP) $(DSTDIR)/$(NAME)

uninstall:
	@rm -f $(DSTDIR)/$(NAME)

clean:
	@rm -rf dist/*

#.PHONY: test
#test:
#	@
