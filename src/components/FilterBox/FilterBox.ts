import HTML_STR from './FilterBox.c.html'
import CSS_STR from './FilterBox.c.scss'
import {
    Component,
    ShadowComponent,
    TagButton
} from '../components'
import EBuilder from 'ebuilder-js'

interface FilterBoxProps {
    activeFilters: Set<string>,
    tagButtons: TagButton[],
    handleFilterSet: (value: Set<string>) => void
}

@Component({
    tagname: 'filter-box',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class FilterBox extends ShadowComponent {
    props: FilterBoxProps = {
        activeFilters: new Set(),
        tagButtons: [],
        handleFilterSet: (value) => {}
    }
    
    setFilters(tagSet: Set<string>, callback: Function) {
        const createTagButton = (name: string) => EBuilder(new TagButton(name))
            .setListeners(['click', this.handleTagButtonClick.bind(this)])
            .into(EBuilder('li').into(this.$container))
            .element

        const tagButtons = [...tagSet].map(createTagButton)

        this.setProps({
            tagButtons,
            handleFilterSet: callback
        }, false)

        console.log(this.props.tagButtons[4].props)
    }

    handleTagButtonClick(event: MouseEvent) {
        const tagButton = event.currentTarget as TagButton
        const value = tagButton.props.name

        tagButton.toggleIsActive()
        this.setActiveFilters(value)
    }

    setActiveFilters(value: string) {
        this.props.activeFilters.has(value)
            ? this.props.activeFilters.delete(value)
            : this.props.activeFilters.add(value)

        this.props.handleFilterSet(this.props.activeFilters)
    }

    clear = () => {
        this.props.activeFilters.clear()
        this.props.tagButtons.forEach((tagButton) => tagButton.setIsActive(false))
        this.props.handleFilterSet(this.props.activeFilters)
    }
    
}